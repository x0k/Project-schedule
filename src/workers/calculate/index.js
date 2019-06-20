import Worker from './calc.worker.js'

const worker = new Worker()

export default function calculate (schedule) {
  return new Promise((resolve, reject) => {
    worker.postMessage(schedule)
    worker.onmessage = ({ data }) => resolve(data)
    worker.onerror = reject
  })
}
