import yup from 'yup'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const createPostSchema = yup.object({
  title: yup.string().max(16, 'Title cannot be longer than 16 words.').required(),
  description: yup.string().max(500, 'Description cannot be longer than 16 words.').required()
})

const controllersCreatePost = async (req, res) => {
  try {
    const { body, params: { bid } } = req
    const verifiedData = await createPostSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })
    const parentBranch = await prisma.branch.findUnique({
      where: {
        id: Number(bid)
      }
    })
    const dataToSave = {
      postName: verifiedData.title,
      postDescription: verifiedData.description,
      branch: {
        connect: { id: parentBranch.id }
      }
    }

    const newPost = await prisma.post.create({
      data: dataToSave
    })

    return res.status(201).json(newPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersCreatePost
