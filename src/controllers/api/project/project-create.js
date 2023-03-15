import yup from 'yup'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const createProjectSchema = yup.object({
  title: yup.string().max(16, 'Title cannot be longer than 16 words.').required(),
  description: yup.string().max(500, 'Description cannot be longer than 16 words.').required()
})

const controllersCreateProject = async (req, res) => {
  try {
    const { body, session: { userId } } = req
    const verifiedData = await createProjectSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })
    const dataToSave = {
      projectName: verifiedData.title,
      projectDescription: verifiedData.description,
      user: {
        connect: { id: userId }
      }
    }

    const newPost = await prisma.project.create({
      data: dataToSave
    })

    return res.status(201).json(newPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersCreateProject
