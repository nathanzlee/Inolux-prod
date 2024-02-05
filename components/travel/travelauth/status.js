import '../../../util/keywords'
import { APPROVED_STATUS, DENIED_STATUS, PENDING_STATUS } from '../../../util/keywords'

const Status = ({ status }) => {
    const approvedStyle = "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
    const pendingStyle = "inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800"
    const deniedStyle = "inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"

    let style, text 

    if (status == "Approved") {
        style = approvedStyle
        text = APPROVED_STATUS
    } else if (status == "Pending Approval") {
        style = pendingStyle
        text = PENDING_STATUS
    } else {
        style = deniedStyle
        text = DENIED_STATUS
    }

    return (
        <span className={style}>
            {text}
        </span>
    )
}

export default Status