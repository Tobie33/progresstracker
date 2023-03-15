import yup from 'yup'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const editProjectSchema = yup.object({
  title: yup.string().max(16, 'Title cannot be longer than 16 words.').required(),
  description: yup.string().max(500, 'Description cannot be longer than 16 words.').required()
})

const controllersEditProject = async (req, res) => {
  try {
    const { body, params: { pid } } = req
    const verifiedData = await editProjectSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })
    const dataToSave = {
      projectName: verifiedData.title,
      projectDescription: verifiedData.description
    }

    const editedProject = await prisma.project.update({
      where: { id: Number(pid) },
      data: dataToSave
    })

    return res.status(201).json(editedProject)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersEditProject
