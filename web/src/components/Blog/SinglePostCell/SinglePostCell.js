import Post from 'src/components/Blog/Post'
import { useLocalForm } from 'tinacms'
import { useMutation } from '@redwoodjs/web'

export const beforeQuery = ({ slug }) => ({
  variables: { slug },
})

export const QUERY = gql`
  query POSTS_FIND_BY_SLUG($slug: String) {
    post: findPostBySlug(slug: $slug) {
      id
      title
      slug
      author
      body
      image
      postedAt
      tags {
        id
        name
      }
    }
  }
`

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: ID!, $input: PostInput!) {
    updatePost(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ post: postData }) => {
  const [updatePost] = useMutation(UPDATE_POST_MUTATION)

  const [post] = useLocalForm({
    id: postData.id,
    initialValues: postData,
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'author',
        label: 'Author',
        component: 'text',
      },
      {
        name: 'body',
        label: 'Post',
        component: 'markdown',
      },
    ],
    onSubmit: (formData) => {
      const { title, slug, author, body } = formData
      return updatePost({
        variables: {
          id: parseInt(post.id),
          input: {
            title,
            slug,
            author,
            body,
          },
        },
      })
    },
  })
  return (
    <>
      <Post post={post} />
    </>
  )
}
