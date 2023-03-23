import yup from 'yup'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const createBranchSchema = yup.object({
  title: yup.string().max(16, 'Title cannot be longer than 16 words.').required(),
  description: yup.string().max(500, 'Description cannot be longer than 16 words.').required()
})

const controllersCreateBranch = async (req, res) => {
  try {
    const { body, params: { pid } } = req
    console.log(body)
    const verifiedData = await createBranchSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })
    const parentProject = await prisma.project.findUnique({
      where: {
        id: Number(pid)
      }
    })
    const dataToSave = {
      branchName: verifiedData.title,
      branchDescription: verifiedData.description,
      project: {
        connect: { id: parentProject.id }
      }
    }

    const newBranch = await prisma.branch.create({
      data: dataToSave
    })

    return res.status(201).json(newBranch)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersCreateBranch
