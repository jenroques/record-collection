import React from 'react'
import { connect } from 'react-redux'

export const DeleteRecord = (props) => {
    return (
        <div>DeleteRecord</div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRecord)
