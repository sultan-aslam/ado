import React, { useState, useEffect } from 'react';
import { Row, Col, Radio } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './customBarChart.module.css';
import {
  LeftArrowBarChartSvg,
  RightArrowBarChartSvg
} from '@/components/common/svgs/Svgs';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import { setGlanceData } from '@/store/features/glance/glanceSlice';
import dayjs from 'dayjs';
import NoSelectionFound from '../NoSelectionFound/NoSelectionFound';
// import { updatePayload } from '@/store/features/chartPayload/chartPayloadSlice';
// import { updateReselectionPayload } from '@/store/features/reselectionPayload/reSelectionPayload';
// import { reselectionCustomLoader } from '@/store/features/reselection/reSelectionSlice';
import { usePackageFilterStore } from '@/hooks/useZustandStore';
import { usePostData } from '@/hooks/useApi';
// import { POST } from '@/lib/api';

const CustomBarChart = ({ selectedDate, setSelectedDate, loading }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setLoading] = useState(false);
  const { mutateAsync: postDynamicPackagePrice } = usePostData(
    'dynamic-package-price',
    'api/hotels/Dynamicpackagepricetable'
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTravelDate = travelDate => {
    // const date = moment(travelDate);
    // return date.locale('nl').format('D dd MMM')
    const date = dayjs(travelDate);
    return date.format('dd D MMM');
  };

  const transformBarChartValues = barChartValues => {
    return barChartValues?.map(item => {
      return {
        days: parseInt(item.duration) + 1,
        nights: parseInt(item.duration),
        amount: parseFloat(item?.alternativeOfferRooms[0]?.price),
        date: formatTravelDate(item.travelDate)
      };
    });
  };
  // const {
  //   barChartValues,
  // } = useAppSelector(state => state.barChart);
  const barChartValues = []
  const {
    // reSelectionData,
    loading: loadCount,
    error: hotelReSelectionError,
    customLoader: customLoaderCount
  } = useAppSelector(state => state.reSelectionSearch);
  const hotelReSelectionLoading = loadCount > 0;
  // const data = transformBarChartValues(barChartValues || []);
  const [data, setDD] = useState([]);
  const maxAmount = Math.max(...data.map(item => item.amount)) ?? 0;
  const [selectedBar, setSelectedBar] = useState(null);
  const [visibleStart, setVisibleStart] = useState(0);
  // const dispatch = useAppDispatch();

  const refetch = async (
    payloadBarChart,
    lastDate,
    lastDays,
    firstDate,
    firstDays,
    num = 0
  ) => {
    const currentItem = data.length
      ? data[visibleStart + Math.floor(visibleCount / 2)]
      : transformBarChartValues(barChartValues)[
          [visibleStart + Math.floor(visibleCount / 2)]
        ];
    setLoading(true);
    const [lastData, firstData] = await Promise.all([
      postDynamicPackagePrice({
        ...payloadBarChart,
        priceTableRequest: {
          ...payloadBarChart.priceTableRequest,
          SelectedTravelDate: lastDate,
          Duration: lastDays
        }
      }),
      postDynamicPackagePrice({
        ...payloadBarChart,
        priceTableRequest: {
          ...payloadBarChart.priceTableRequest,
          SelectedTravelDate: lastDate,
          Duration: lastDays
        }
      })
    ]);
    setLoading(false);

    const updatedData = getUniqueByKey(
      [
        ...transformBarChartValues(firstData?.data || []),
        ...data,
        ...transformBarChartValues(lastData?.data || [])
      ],
      'date'
    );
    setDD(updatedData);

    if (currentItem) {
      const newIndex = updatedData.findIndex(
        item => item.date === currentItem.date
      );
      if (newIndex !== -1) {
        if (num < 0) {
          setVisibleStart(
            Math.max(0, newIndex - Math.floor(visibleCount / 2)) - 1
          );
        } else if (num > 0)
          setVisibleStart(
            Math.max(0, newIndex - Math.floor(visibleCount / 2)) + 1
          );
        else
          setVisibleStart(Math.max(0, newIndex - Math.floor(visibleCount / 2)));
      }
    }
  };

  useEffect(() => {
    if (loading) setDD([]);
    if (barChartValues && barChartValues.length && !loading) {
      const data = transformBarChartValues(barChartValues);
      setDD(data);
      const lastItem = data[data.length - 1];
      const firstItem = data[0];

      if (lastItem) {
        const payloadBarChart = JSON.parse(
          localStorage.getItem('bar-chart-payload') ?? '{}'
        );
        // refetch(
        //   payloadBarChart,
        //   formattedDateDispatched(lastItem),
        //   lastItem.days,
        //   formattedDateDispatched(firstItem),
        //   firstItem.days
        // );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barChartValues, loading]);
  const { packageFilter, setPackageFilter } = usePackageFilterStore();
  const [visibleCount, setVisibleCount] = useState(
    getVisibleCount(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedDate && barChartValues) {
      const formattedSelectedDate = formatTravelDate(selectedDate);

      const matchingBarIndex = data?.findIndex(
        item => item.date === formattedSelectedDate
      );

      const itemBar = data?.filter(item => item.date === formattedSelectedDate);

      if (matchingBarIndex !== -1) {
        setSelectedBar(matchingBarIndex);
        // dispatch(setGlanceData({ type: 'priceTable', value: itemBar[0] }));
      } else {
        setSelectedBar(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barChartValues]);

  const formattedDateDispatched = item => {
    const currentYear = new Date(selectedDate).getFullYear();
    if (!item) return null;
    const dateString = `${item.date} ${currentYear}`;
    const parsed = dayjs(dateString, 'dd D MMM YYYY');
    return parsed.isValid() ? parsed.format('YYYY-MM-DDTHH:mm:ss') : null;
  };

  const handleSelectBar = (index, item) => {
    const formatDate = formattedDateDispatched(item);
    if (!formatDate) return;
    // dispatch(setGlanceData({ type: 'priceTable', value: item }));
    // dispatch(
    //   updatePayload({
    //     SelectedTravelDate: formatDate,
    //     Duration: item?.days
    //   })
    // );
    // dispatch(reselectionCustomLoader());
    // dispatch(
    //   updateReselectionPayload({
    //     TravelDateSelected: formatDate,
    //     DurationSelected: String(item?.days)
    //   })
    // );
    setPackageFilter({
      ...packageFilter,
      selectedDate: formatDate
    });
    setSelectedDate(formatDate);
  };

  const handlePrev = () => {
    if (visibleStart === 1) return;
    if (visibleStart > 3) {
      setVisibleStart(prev => prev - 1);
    } else {
      setVisibleStart(prev => prev - 1);
      const lastItem = data[data.length - 1];
      const firstItem = data[0];
      if (firstItem) {
        const payloadBarChart = JSON.parse(
          localStorage.getItem('bar-chart-payload') ?? '{}'
        );
        refetch(
          payloadBarChart,
          formattedDateDispatched(lastItem),
          lastItem.days,
          formattedDateDispatched(firstItem),
          firstItem.days,
          -1
        );
      }
    }
  };

  const handleNext = () => {
    if (visibleStart + 1 === data.length - visibleCount) return;
    if (visibleStart + 4 < data.length - visibleCount) {
      setVisibleStart(prev => prev + 1);
    } else {
      setVisibleStart(prev => prev + 1);
      const firstItem = data[0];
      const lastItem = data[data.length - 1];
      if (lastItem) {
        const payloadBarChart = JSON.parse(
          localStorage.getItem('bar-chart-payload') ?? '{}'
        );
        refetch(
          payloadBarChart,
          formattedDateDispatched(lastItem),
          lastItem.days,
          formattedDateDispatched(firstItem),
          firstItem.days,
          1
        );
      }
    }
  };

  const barWidth = `${100 / visibleCount}%`;

  if (
    hotelReSelectionError &&
    hotelReSelectionError !== 'signal is aborted without reason' &&
    !hotelReSelectionLoading
  ) {
    return <NoSelectionFound />;
  }

  function convertToDutchFormat(englishDate) {
    const translations = {
      Sa: 'Za',
      Su: 'Zo',
      Mo: 'Ma',
      Tu: 'Di',
      We: 'Wo',
      Th: 'Do',
      Fr: 'Vr',
      Jan: 'jan',
      Feb: 'feb',
      Mar: 'mrt',
      Apr: 'apr',
      May: 'mei',
      Jun: 'jun',
      Jul: 'jul',
      Aug: 'aug',
      Sep: 'sep',
      Oct: 'okt',
      Nov: 'nov',
      Dec: 'dec'
    };

    return englishDate
      .split(' ')
      .map(word => translations[word] || word)
      .join(' ');
  }

  return (
    <>
      <div className={styles.chartWrapper}>
        <Row className={`${styles.chartContainer} relative`} justify="center">
          {isMobile ? (
            hotelReSelectionLoading ? null : (
              <LeftOutlined className={styles.arrow} onClick={handlePrev} />
            )
          ) : (
            <>
              {data.length > visibleCount && (
                <LeftArrowBarChartSvg
                  className={styles.arrow}
                  onClick={handlePrev}
                />
              )}
            </>
          )}
          {isLoading && (visibleStart < 2 || data.length - visibleStart < 9)
            ? Array.from({ length: visibleCount }).map((_, index) => {
                const randomDelay = `${Math.random() * 2}s`;
                return (
                  <Col
                    key={index}
                    className={styles.barContainer}
                    style={{ width: barWidth }}
                  >
                    <div
                      key={index}
                      className={styles.loadingBar}
                      style={{
                        borderRadius: '5px',
                        width: '90px',
                        height: `300px`,
                        backgroundColor: '#f2f2f2',
                        '--target-height': `300px`,
                        '--random-delay': randomDelay,
                        animationDelay: randomDelay
                      }}
                    />
                  </Col>
                );
              })
            : data
                .slice(visibleStart, visibleStart + visibleCount)
                .map((item, index) => {
                  const barHeight = (item.amount / maxAmount) * 300 + 10;
                  /* const isSelected = selectedBar === visibleStart + index; */
                  const isSelected =
                    item.date === formatTravelDate(selectedDate);
                  return (
                    <Col
                      key={index}
                      className={styles.barContainer}
                      style={{ width: barWidth }}
                    >
                      <>
                        <div
                          className={styles.bar}
                          style={{
                            borderRadius: '5px',
                            width: '90px',
                            height: `${barHeight}px`,
                            backgroundColor: isSelected ? '#FF6F26' : '#FEF1D6',
                            transform: `translateY(${300 - barHeight}px)`
                          }}
                          onClick={() =>
                            handleSelectBar(visibleStart + index, item)
                          }
                        >
                          <div className={styles.topInfo}>
                            <div
                              className={
                                isSelected
                                  ? `${styles.selectedVanaf}`
                                  : `${styles.vanaf}`
                              }
                            >
                              vanaf
                            </div>
                            <div
                              className={
                                isSelected
                                  ? `${styles.selectedAmount}`
                                  : `${styles.amount}`
                              }
                            >
                              € {Math.floor(item.amount)}
                            </div>
                          </div>
                          <div className={styles.bottomInfo}>
                            <div
                              className={
                                isSelected
                                  ? `${styles.selectedDays}`
                                  : `${styles.days}`
                              }
                            >
                              {item.days} dagen
                            </div>
                            <div
                              className={
                                isSelected
                                  ? `${styles.selectedNights}`
                                  : `${styles.nights}`
                              }
                            >
                              ({item.nights} nachten)
                            </div>
                          </div>
                        </div>
                        <div className={styles.dateRadioContainer}>
                          <div className={styles.date}>
                            {convertToDutchFormat(item.date)}
                          </div>
                          <Radio
                            className={styles.radio}
                            checked={isSelected}
                            onChange={() =>
                              handleSelectBar(visibleStart + index, item)
                            }
                          ></Radio>
                        </div>
                      </>
                    </Col>
                  );
                })}
          {isMobile ? (
            hotelReSelectionLoading ? null : (
              <RightOutlined className={styles.arrow} onClick={handleNext} />
            )
          ) : (
            <>
              {data.length > visibleCount && (
                <RightArrowBarChartSvg
                  className={styles.arrow}
                  onClick={handleNext}
                />
              )}
            </>
          )}
        </Row>
      </div>
      <p style={{ marginTop: '10px', fontWeight: '500' }}>
        Let op! Prijzen (per persoon) in de prijstabel kunnen door updates
        afwijken van de totaalprijs in de kassabon. De prijzen in de prijstabel
        zijn indicatieve prijzen. Nadat u op een bedrag in de prijstabel klikt,
        verschijnt de concrete en actuele prijs in de kassabon.
      </p>
    </>
  );
};

export default CustomBarChart;

function getUniqueByKey(array, key) {
  const seen = new Set();
  return array.filter(item => {
    if (seen.has(item[key])) {
      return false;
    }
    seen.add(item[key]);
    return true;
  });
}

export const getVisibleCount = width => {
  if (width >= 1025) return 7;
  if (width >= 769) return 5;
  if (width >= 601) return 5;
  if (width >= 501) return 4;
  if (width >= 400) return 3;
  return 2;
};
