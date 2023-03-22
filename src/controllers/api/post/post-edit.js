import yup from 'yup'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const editPostSchema = yup.object({
  title: yup.string().max(16, 'Title cannot be longer than 16 words.').required(),
  description: yup.string().max(500, 'Description cannot be longer than 16 words.').required()
})

const controllersEditPost = async (req, res) => {
  try {
    const { body, params: { postId } } = req
    const verifiedData = await editPostSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })

    const dataToSave = {
      postName: verifiedData.title,
      postDescription: verifiedData.description
    }

    const editedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: dataToSave
    })

    return res.status(201).json(editedPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersEditPost
