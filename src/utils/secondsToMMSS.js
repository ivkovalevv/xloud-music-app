import moment from "moment/moment"

export default (seconds) => {
    let result = moment.utc(seconds * 1000).format("mm:ss")
    return result
}