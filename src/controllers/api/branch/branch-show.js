import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerBranchShow = async (req, res) => {
  try {
    const { params: { bid } } = req
    const foundBranch = await prisma.branch.findUnique({
      where: {
        id: Number(bid) || 0
      },
      include: {
        comments: true,
        posts: true
      }
    })
    return res.status(200).json(foundBranch)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerBranchShow
