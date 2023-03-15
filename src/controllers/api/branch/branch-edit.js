import yup from 'yup'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const editBranchSchema = yup.object({
  title: yup.string().max(16, 'Title cannot be longer than 16 words.').required(),
  description: yup.string().max(500, 'Description cannot be longer than 16 words.').required()
})

const controllersEditBranch = async (req, res) => {
  try {
    const { body, params: { bid } } = req
    const verifiedData = await editBranchSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })

    const dataToSave = {
      branchName: verifiedData.title,
      branchDescription: verifiedData.description
    }

    const editedBranch = await prisma.branch.update({
      where: { id: Number(bid) },
      data: dataToSave
    })

    return res.status(201).json(editedBranch)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersEditBranch
