const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  let total = 0
  blogs.forEach(function(blog) {
    total += blog.likes
  });

  return total
}

const favoriteBlog = (blogs) => {
  //const maxLikes = Math.max(...blogs.map(o => o.likes), 0);
  const mostLikedBlog = blogs.find(blog => blog.likes === Math.max(...blogs.map(o => o.likes), 0))
  //console.log(maxLikes)
  console.log(mostLikedBlog)
  if (mostLikedBlog === undefined){ 
    return 'No blog was found'
  }
  else {
    return mostLikedBlog
  }
}
const mostBlogs = (blogs) => {
  return 'jee'
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}