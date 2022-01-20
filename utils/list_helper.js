/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const dummy = (blogs) => {
  let one = 1
  let array = blogs
  
  return array = one
}

const totalLikes = (blogs) => {
  let likes = blogs.reduce((acc, blog) => acc + blog.likes, 0)

  return likes
}
  
module.exports = {
  dummy,
  totalLikes
}