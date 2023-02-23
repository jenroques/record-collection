import React from 'react'
import { connect } from 'react-redux'

export const Logout = (props) => {
    return (
        <div>Logout</div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
