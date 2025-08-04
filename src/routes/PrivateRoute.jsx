import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
  const { token, user } = useSelector(state => state.auth)
  return token ? children : <Navigate to={'/'} />
}
