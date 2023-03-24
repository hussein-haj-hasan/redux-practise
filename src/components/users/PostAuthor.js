import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../state/users/UsersSlice'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  console.log(author)
  return <span>by {author ? author.name : 'Unknown author'}</span>
}
