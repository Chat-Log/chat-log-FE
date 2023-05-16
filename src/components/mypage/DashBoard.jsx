import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import AntdCard from "../common/AntdCard";
import AntdContent from "../common/AntdContent";
import { IMAGES, PATH } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { __getDailyCompletionCounts } from "../../redux/modules/searchSlice";
import { useNavigate } from "react-router-dom";

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

const DashBoard = () => {
  const [completionData, setCompletionData] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const yearDates = useMemo(() => generateYearDates(currentYear), [currentYear]);

  const dispatch = useDispatch();
  const grassData = useSelector((state) => state.search.dateData);
  const navigate = useNavigate();

  // console.log(completionData);

  const totalCount = grassData[0]?.yearly?.count;

  const fetchCompletionData = useCallback(async () => {
    const data = await dispatch(__getDailyCompletionCounts(currentYear));
    const dailyData = data?.payload?.daily;

    const completionData = yearDates.reduce((acc, date) => {
      const item = dailyData?.find((item) => item.date === date);
      acc[date] = item ? item.count : 0;
      return acc;
    }, {});
    // const yearDates = generateYearDates(currentYear);
    // const mockData = yearDates.reduce((acc, date) => {
    //   acc[date] = Math.floor(Math.random() * 20); // 랜덤으로 일단 생성
    //   return acc;
    // }, {});
    // console.log(mockData);
    setCompletionData(completionData);
  }, [currentYear]);

  useEffect(() => {
    fetchCompletionData();
  }, [fetchCompletionData]);

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
      const dayIndex = (index + startOffset) % 7;

      if (!cells[weekIndex]) {
        cells[weekIndex] = [];
      }
      cells[weekIndex].push(<CompletionCell key={date} bgColor={getCellColor(completionData[date])} date={date} count={completionData[date]} onClick={() => handleCellClick(date)} />);
    }

    return cells.map((week, index) => <Week key={index}>{week}</Week>);
  };

  const changeYear = (direction) => {
    setCurrentYear((prevYear) => prevYear + direction);
  };

  return (
    <>
      <AntdContent>
        <StBox>
          <YearSelector>
            {/* <button onClick={() => changeYear(-1)}>이전 년도</button> */}
            {/* <span>{currentYear}</span> */}
            {/* <button onClick={() => changeYear(1)}>다음 년도</button> */}
            <p>
              {totalCount} contributions in {currentYear}
            </p>
          </YearSelector>
          <StGrass>
            <StDays>{renderDayLabels()}</StDays>
            <StCells>{renderCompletionCells()}</StCells>
          </StGrass>
        </StBox>
        <StCardBox>
          <AntdCard title="사용 토근수" body="126,560" width="300px" img={IMAGES.token} />
          <AntdCard title="예상 사용 요금" body="0.6$" width="300px" img={IMAGES.bill} />
          <AntdCard title="누적 질문 수" body="8,560" width="300px" img={IMAGES.question} />
          <AntdCard title="Chat GPT" body="" width="300px" img={IMAGES.gpt} imgWd="240px" height="120px" href="https://chat.openai.com/chat" />
        </StCardBox>
      </AntdContent>
    </>
  );
};

export default DashBoard;

const StBox = styled.div`
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
  /* overflow-x: hidden; */
`;

const StCardBox = styled.div`
  /* width:100% */
  display: flex;

  flex-wrap: wrap;
  max-width: 99%;

  flex-direction: row;
  align-items: center;
  margin: 40px 40px 40px 40px;
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
  font-size: 1.3rem;
  padding-bottom: 5px;

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
    width: 15px; // 셀의 크기를 줄입니다.
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
  display: flex;
  align-items: center;
  margin-top: 10px;

  width: 700px;

  button {
    background-color: #f0f0f0;
    border: none;
    padding: 5px 10px;
    font-size: 1.2rem;
    cursor: pointer;
  }

  span {
    margin: 0 10px;
    font-size: 1.3rem;
  }
  p {
    /* margin-left: 10px; */
    font-size: 1.3rem;
    color: #4a8aeb;
    margin-bottom: 50px;
  }
`;
