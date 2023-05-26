import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDailyCompletionCounts, __getFee, __getTokenCounts } from "../redux/modules/searchSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { CustomBox, CustomContent, CustomDrawer } from "../components/common";

import { IMAGES, PATH } from "../constants/index";

import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

const generateYearDates = (year) => {
  const dates = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  let day = startDate;
  while (day <= endDate) {
    const dateString = day.toISOString().slice(0, 10);
    dates.push(dateString);
    day.setDate(day.getDate() + 1);
  }

  return dates;
};

const MyPage = () => {
  const [completionData, setCompletionData] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const yearDates = useMemo(() => generateYearDates(currentYear), [currentYear]);

  const dispatch = useDispatch();
  const grassData = useSelector((state) => state.search.dateData);
  const navigate = useNavigate();

  const tokenData = useSelector((state) => state.search.tokenData);

  const totalFee = useSelector((state) => state.search.totalFee);
  const feeData = totalFee?.dailyCounts;
  const labels = feeData?.map((item) => item.date);
  const data = feeData?.map((item) => item.totalFee);

  const totalCompletionCount = grassData[0]?.yearly?.count;

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const [selectedContent, setSelectedContent] = useState("");

  const showDrawerHandler = (contentType) => {
    setSize("large");
    setOpen(true);
    setSelectedContent(contentType);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchCompletionData = useCallback(async () => {
    const data = await dispatch(__getDailyCompletionCounts(currentYear));
    const dailyData = data?.payload?.daily;

    const completionData = yearDates.reduce((acc, date) => {
      const item = dailyData?.find((item) => item.date === date);
      acc[date] = item ? item.count : 0;
      return acc;
    }, {});
    setCompletionData(completionData);
  }, [currentYear]);

  useEffect(() => {
    fetchCompletionData();
  }, [fetchCompletionData]);

  useEffect(() => {
    dispatch(
      __getTokenCounts({
        groupByEachModel: false,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(__getFee());
  }, []);

  const getCellColor = (count) => {
    if (count > 14) {
      return "#196127";
    } else if (count > 9) {
      return "#239a3b";
    } else if (count > 4) {
      return "#7bc96f";
    } else if (count > 0) {
      return "#c6e48b";
    } else {
      return "#ebedf0";
    }
  };

  const renderDayLabels = () => {
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayLabels.map((day, index) => <DayLabel key={index}>{day}</DayLabel>);
  };

  const handleCellClick = (date) => {
    navigate(PATH.date(date));
  };

  const renderCompletionCells = () => {
    const cells = [];
    const yearStartDate = new Date(currentYear, 0, 1);
    const startOffset = yearStartDate.getDay() === 0 ? 6 : yearStartDate.getDay() - 1;

    for (let i = 0; i < startOffset; i++) {
      if (!cells[0]) {
        cells[0] = [];
      }
      cells[0].push(<CompletionCell key={`empty-${i}`} bgColor="#ffffff" />);
    }

    for (const date in completionData) {
      const index = yearDates.indexOf(date);
      const weekIndex = Math.floor((index + startOffset) / 7);

      if (!cells[weekIndex]) {
        cells[weekIndex] = [];
      }
      cells[weekIndex].push(<CompletionCell key={date} bgColor={getCellColor(completionData[date])} date={date} count={completionData[date]} onClick={() => handleCellClick(date)} />);
    }

    return cells.map((week, index) => <Week key={index}>{week}</Week>);
  };

  let date = new Date();
  let month = date.getMonth() + 1;

  let fee = Math.round(totalFee?.monthlyCounts?.totalFee * 1000) / 1000;

  const graphData = {
    labels: tokenData?.dailyCounts?.map((item) => item.date),
    datasets: [
      {
        label: `${month}월 사용 토큰수`,
        data: tokenData?.dailyCounts?.map((item) => item.count),
        backgroundColor: "rgba(243, 243, 11, 0.6)",
      },
    ],
  };

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: `${month}월 예상 요금`,
        data: data,
        fill: true, // true로 설정 => Area Chart
        backgroundColor: "rgba(171, 75, 192, 0.2)",
        borderColor: "#9b4bc0",
        borderWidth: 1,
      },
    ],
  };

  const contents = {
    token: (
      <>
        <StTitle style={{ textAlign: "center" }}>{`${month}월 사용 토큰수`}</StTitle>
        <div style={{ marginTop: "70px" }}>
          <Bar data={graphData} />
        </div>
      </>
    ),
    fee: (
      <>
        <StTitle style={{ textAlign: "center" }}>{`${month}월 예상 요금`}</StTitle>
        <div style={{ marginTop: "70px" }}>
          <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </>
    ),
  };

  return (
    <>
      <CustomContent>
        <StTitle style={{ marginTop: "30px" }}>사용량 잔디 시각화</StTitle>
        <StBox>
          <YearSelector>
            <p>
              {totalCompletionCount} contributions in {currentYear}
            </p>
          </YearSelector>
          <StGrass>
            <StDays>{renderDayLabels()}</StDays>
            <StCells>{renderCompletionCells()}</StCells>
          </StGrass>
        </StBox>
        <StTitle>Gpt모델 사용 정보</StTitle>
        <StCardBox>
          <CustomBox title={`${month}월 사용 토큰수`} body={tokenData.monthlyCounts?.count} width="230px" img={IMAGES.token} extra={<button onClick={() => showDrawerHandler("token")}>more</button>} />
          <CustomBox title={`${month}월 예상 요금`} body={`${fee} $`} width="230px" img={IMAGES.bill} extra={<button onClick={() => showDrawerHandler("fee")}>more</button>} />
          <CustomBox title={`${month}월 누적 질문 수`} body={`${totalCompletionCount} 개`} width="230px" img={IMAGES.question} />
        </StCardBox>
        <CustomDrawer title="월 예상 사용 요금,토큰 수 그래프" size={size} onClose={onClose} open={open} contents={contents[selectedContent]} />
      </CustomContent>
    </>
  );
};

export default MyPage;

const StBox = styled.div`
  font-family: "MaplestoryOTFLight";

  margin: 30px;
  padding: 30px;

  background: #ffffff;

  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.3s;

  &:hover {
    background: rgb(206, 207, 244);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
  }

  @media (max-width: 1300px) {
    padding: 15px;
  }

  overflow-x: auto;
`;

const StGrass = styled.div`
  display: flex;
`;

const StDays = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 5px;
`;

const StCells = styled.div`
  display: flex;

  /* overflow-x: auto; */
`;

const StTitle = styled.div`
  font-size: 2.3rem;
  margin: 30px;

  font-family: "MaplestoryOTFLight";
`;

const StCardBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  /* max-width: 99%; */

  margin: 30px;
  padding: 30px;

  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.3s;

  &:hover {
    background: rgb(206, 207, 244);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
  }
`;

const DayLabel = styled.div`
  padding-bottom: 5px;

  font-size: 1.3rem;

  @media (max-width: 1300px) {
    font-size: 0.78rem;
  }
`;

const Week = React.memo(styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 2px;

  /* overflow-x: hidden; */
`);

const CompletionCell = React.memo(styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.bgColor,
  },
}))`
  width: 24px;
  height: 24px;

  position: relative;
  cursor: pointer;
  margin-bottom: 2px;

  @media (max-width: 1300px) {
    width: 15px;
    height: 15px;
  }

  &:hover::before {
    content: "${(props) => (props.date && typeof props.count !== "undefined" ? `${props.date} - ${props.count} completions` : "")}";
    position: absolute;
    left: 100%;
    top: -50%;
    white-space: nowrap;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 12px;
    margin-left: 5px;
    z-index: 1;
  }
`);

const YearSelector = styled.div`
  p {
    margin-bottom: 50px;

    color: #4a8aeb;

    font-size: 1.3rem;
  }
`;
