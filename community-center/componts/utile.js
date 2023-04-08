const days = ['周日-', '周一-', '周二-', '周三-', '周四-', '周五-', '周六-']


function _getDays(month) {
  let count = 0
  month = month * 1
  switch (month) {
    case 1, 3, 5, 7, 8, 10, 12:
      count = 31
      break;

    case 2:
      count = _isLeapYear ? 29 : 28
      break

    default:
      count = 30
      break;
  }
  return count
}

function _getDate() {
  const nowDate = new Date()
  return {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
    day: nowDate.getDay(),
  }
}

function _getWeek(date, op) {
  if (date.day + op < days.length) {
    console.log(1);
    return days[date.day * 1 + op]
  } else {
    return days[date.day * 1 + op * 1 - days.length]
  }
}

function _isLeapYear(year) {
  return year % 4 == 0 && year % 100 != 0 || year % 400 == 0
}

function _fomatDate(date, op, desc) {
  if (date.month == 12 && date.date + op > 31) {
    return `明年 ${date.year + 1} 01-0${date.date * 1 + op * 1 - 31}`
  } else {
    const currentMonthDays = _getDays(date.month)
    if (date.date + op <= currentMonthDays) {
      return `${desc || _getWeek(date, op)} ${date.month}-${date.date + op}`
    } else {
      console.log(1);
      return `下月 ${date.month + 1}-${date.date * 1 + op * 1 - currentMonthDays} ${_getWeek(date, op)}`
    }
  }

}

export const getDayList = () => {
  const data = _getDate()
  return [
    {
      value: 0,
      date: '今天-' + data.month + '-' + data.date
    }, {
      value: 1,
      date: _fomatDate(data, 1, '明天-')
    }, {
      value: 2,
      date: _fomatDate(data, 2, '后天-')
    }, {
      value: 3,
      date: _fomatDate(data, 3,)
    }, {
      value: 4,
      date: _fomatDate(data, 4)
    }, {
      value: 5,
      date: _fomatDate(data, 5)
    }, {
      value: 6,
      date: _fomatDate(data, 6)
    }
  ]
}


export const getTimeSlot = (isNow) => {

  const data = [
    '06:00-08:00',
    '08:00-10:00',
    '10:00-12:00',
    '12:00-14:00',
    '14:00-16:00',
    '16:00-18:00',
    '18:00-20:00',
    '20:00-22:00'
  ]

  if (isNow) {
    const nowTime = (new Date()).getHours()
    const index = data.findIndex(item => {
      const data = item.split('-')
      const left = data[0].split(':')[0] * 1
      const right = data[1].split(':')[0] * 1
      return left < nowTime && nowTime <= right
    })
    return data.slice(index + 1)
  }

  return data
}

export const splitProject = data => {
	const res = [];
	for (const project of data) {
		const index = res.findIndex(item => item.parentName === project.parentName);
		if (index == -1) {
			res.push({
				parentName: project.parentName,
				id: new Date().getTime().toString() + Math.random() * 100,
				children: [
					{
						id: new Date().getTime().toString() + Math.random() * 100,
						projectName: project.projectName,
						lowestPrice: project.lowestPrice,
						highestPrice: project.highestPrice,
						unit: project.unit,
						contentDescription: project.contentDescription
					}
				]
			});
		} else {
			res[index].children.push({
				id: new Date().getTime().toString() + Math.random() * 100,
				projectName: project.projectName,
				lowestPrice: project.lowestPrice,
				highestPrice: project.highestPrice,
				unit: project.unit,
				contentDescription: project.contentDescription
			});
		}
	}
	return res;
};