import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDailyCompletionCounts, __getSearch } from "../redux/modules/searchSlice";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Card, CardBox } from "../components/card";

import { CustomContent, CustomPagination } from "../components/common";

import { PATH } from "../constants";

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

const SortedByDatePage = () => {
  const [completionData, setCompletionData] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const yearDates = useMemo(() => generateYearDates(currentYear), [currentYear]);

  const [currentPage, setCurrentPage] = useState("1");
  const [itemsPerPage, setItemsPerPage] = useState("5");

  const grassData = useSelector((state) => state.search?.dateData);
  const totalCount = useSelector((state) => state.search?.totalCount);

  const totalCompletionCount = grassData[0]?.yearly?.count;

  const navigate = useNavigate();

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

  const getCellColor = (count) => {
    if (count > 14) {
      return "#0066CC";
    } else if (count > 9) {
      return "#0099FF";
    } else if (count > 4) {
      return "#33CCFF";
    } else if (count > 0) {
      return "#9fdcfa";
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
      cells[0].push(<CompletionCell key={`empty-${i}`} bgColor="#ebedf0" />);
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

  const param = useParams();
  const date = param.date;

  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search.data);

  useEffect(() => {
    setCurrentPage("1");
    dispatch(__getSearch({ date: date !== "" ? date : null, pagesize: itemsPerPage, pageindex: "1" }));
  }, [date]);

  const changePageHandler = (page) => {
    setCurrentPage(page);
    dispatch(
      __getSearch({
        date: date !== "" ? date : null,
        pagesize: itemsPerPage,
        pageindex: page,
      })
    );
  };

  const cardClickHandler = (topicId) => {
    navigate(PATH.main(topicId));
  };

  return (
    <>
      <CustomContent of="auto">
        <StBox>
          <YearSelector>
            <p>
              {totalCompletionCount} completion in {currentYear}
            </p>
          </YearSelector>
          <StGrass>
            <StDays>{renderDayLabels()}</StDays>
            <StCells>{renderCompletionCells()}</StCells>
          </StGrass>
        </StBox>
        <CardBox>
          {searchData[0] ? (
            searchData.map((data, index) => (
              <Card
                onClick={() => cardClickHandler(data.topicId)}
                createdAt={data.createdAt}
                key={index}
                title={data.topicTitle}
                question={data.question}
                answer={data.answer}
                tags={data.tagNames}
              ></Card>
            ))
          ) : (
            <StNoSearchedData>해당 날짜에 데이터가 없습니다.</StNoSearchedData>
          )}
        </CardBox>
        {searchData[0] ? <CustomPagination total={totalCount} itemsPerPage={itemsPerPage} currentPage={currentPage} changePageHandler={changePageHandler}></CustomPagination> : null}
      </CustomContent>
    </>
  );
};

export default SortedByDatePage;

const StNoSearchedData = styled.div`
  font-family: "MaplestoryOTFLight";
  font-size: 1.5rem;
  color: #888;
  text-align: center;
  margin-top: 100px;
`;

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
  display: flex;
  align-items: center;
  margin-top: 20px;

  width: 700px;

  button {
    padding: 5px 10px;

    background-color: #f0f0f0;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  span {
    margin: 0 10px;
    font-size: 1.3rem;
  }

  p {
    margin-bottom: 20px;
    font-size: 1.3rem;
    color: #4a8aeb;
  }
`;
