import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerProjectShow = async (req, res) => {
  try {
    const { params: { pid } } = req
    const foundProject = await prisma.project.findUnique({
      where: {
        id: Number(pid) || 0
      },
      include: {
        comments: true,
        branches: {
          include: {
            posts: true
          }
        }
      }
    })
    return res.status(200).json(foundProject)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerProjectShow
