const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes  = array => {
   let sum = 0
    array.forEach(element => {
        sum += element.likes
    })
    return sum
  }
  
  const favoriteBlog  = array => {
    const favorite = array.reduce((previous, current) => {
        return current.likes > previous.likes ? current : previous;
      })
      return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
   }

   const mostBlogs = blogs => {
    // Usar _.countBy para contar la cantidad de blogs por autor
    const blogCountByAuthor = _.countBy(blogs, 'author');
    // Usar _.maxBy para encontrar el autor con el mayor recuento de blogs
    const maxAuthor = _.maxBy(_.toPairs(blogCountByAuthor), ([, count]) => count);
    return {
        author: maxAuthor[0],
        blogs: maxAuthor[1]};
  }

  const mostLikes = blogs => {
    // Usar _.groupBy para agrupar blogs por autor
    const blogsByAuthor = _.groupBy(blogs, 'author');
    // Usar _.map para calcular el total de likes por autor
    const likesByAuthor = _.map(blogsByAuthor, (blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes'),
    }));
    // Usar _.maxBy para encontrar el autor con la mayor cantidad de likes
    const authorWithMostLikes = _.maxBy(likesByAuthor, 'likes');
    return authorWithMostLikes;
  }
  

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }