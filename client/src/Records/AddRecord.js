import React from 'react'
import { connect } from 'react-redux'

export const AddRecord = (props) => {
    return (
        <div>AddRecord</div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord)
