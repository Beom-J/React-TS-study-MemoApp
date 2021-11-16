import dayjs from 'dayjs';
import './style.css';
import 'dayjs/locale/ko';
import IsoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import IsLeapYear from 'dayjs/plugin/isLeapYear';
import MinMax from 'dayjs/plugin/minMax';
import Duration from 'dayjs/plugin/duration';

const Dayjs = () => {
  const now = dayjs();
  const formatByLocale =
    dayjs.locale() === 'ko' ? 'YYYY.M.D. A HH:mm:ss' : 'M-D-YYYY A HH:mm:ss';

  console.log(dayjs().startOf('week').format(formatByLocale));

  return (
    <>
      <div className="day-js">
        <h3>Day.js</h3>
        <p>{now.format(formatByLocale)}</p>
        <input type="month" />
      </div>
    </>
  );
};

export default Dayjs;
