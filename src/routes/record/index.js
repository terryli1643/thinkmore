import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import RecordForm from './RecordForm'

function Record ({ location, dispatch, users, loading }) {
  const { field, keyword } = location.query


  return (
    <div className="content-inner">
      <RecordForm />
    </div>
  )
}

export default Record
