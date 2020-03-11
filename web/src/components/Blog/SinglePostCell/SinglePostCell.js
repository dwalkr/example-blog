import { useEffect, useState } from 'react'
import Post from 'src/components/Blog/Post'
import { useLocalForm } from 'tinacms'
import { useMutation } from '@redwoodjs/web'
import { InlineForm, useInlineForm } from 'react-tinacms-inline'

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

  const [post, form] = useLocalForm({
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
      <InlineForm form={form}>
        <EditBar />
        <Post post={post} />
        <EditBar />
      </InlineForm>
    </>
  )
}

const useFormState = (form, subscription) => {
  const [state, setState] = useState(form.finalForm.getState())
  useEffect(() => {
    form.subscribe(setState, subscription)
  }, [form])
  return state
}

const buttonClasses = (disabled) =>
  `w-full md:w-auto bg-indigo-600 ${
    disabled ? 'opacity-50' : 'hover:bg-indigo-700'
  } text-white uppercase text-sm rounded px-3 py-2 mr-4`

function EditToggle({ status, activate, deactivate }) {
  return (
    <button
      onClick={() => {
        status === 'active' ? deactivate() : activate()
      }}
      className={buttonClasses(false)}
    >
      {status === 'active' ? 'Preview' : 'Edit'}
    </button>
  )
}

function SaveButton({ form, disabled, busy }) {
  return (
    <button
      disabled={disabled || busy}
      onClick={() => {
        alert('Im not disabled')
        form.submit()
      }}
      className={buttonClasses(disabled || busy)}
    >
      {busy ? 'Saving...' : 'Save'}
    </button>
  )
}

function EditBar() {
  const { form, status, activate, deactivate } = useInlineForm()
  const formState = useFormState(form, { dirty: true, submitting: true })

  return (
    <div
      style={{
        width: '100%',
        marginBottom: '2rem',
      }}
    >
      <EditToggle status={status} activate={activate} deactivate={deactivate} />
      {status === 'active' && (
        <SaveButton
          form={form}
          disabled={!formState.dirty}
          busy={formState.submitting}
        />
      )}
    </div>
  )
}
