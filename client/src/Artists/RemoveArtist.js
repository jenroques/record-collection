import React from 'react'
import { connect } from 'react-redux'

export const RemoveArtist = (props) => {
    return (
        <div>RemoveArtist</div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveArtist)
