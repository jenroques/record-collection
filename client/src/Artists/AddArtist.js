import React from 'react'
import { connect } from 'react-redux'

export const AddArtist = (props) => {
    return (
        <div>AddArtist</div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddArtist)
