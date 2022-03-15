 
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createExamplesData() {
  const data = []
  const statusList = ['New', 'In Progress', 'Done']
  // eslint-disable-next-line no-undef
  // const utils = omg.utils
  const start = new Date(new Date().toLocaleDateString())
  const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 30)


  for (let i = 0; i < 20; i++) {
    const from = randomDate(start, end)
    const taskDays = randomNumber(1, 5)
    const to = new Date(from.getTime() + taskDays * 1000 * 60 * 60 * 24)
    const timebarItem = {
      from,
      to,
      desc: `description ${i}`,
    }
    if (taskDays > 3 || taskDays === 1) {
      timebarItem.__config = {
        style: {
          backgroundColor: taskDays === 1 ? 'rgb(4, 138, 109)' : 'rgb(230, 59, 59)',
        }
      }
    }
    const item = {
      id: i,
      name: `Task ${i}`,
      desc: `description ${i}`,
      status: statusList[randomNumber(0, 2)],
      timebar: [ timebarItem ]
    }
    data.push(item)
  }
  return data
}