import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerPostShow = async (req, res) => {
  try {
    const { params: { postId } } = req
    const foundPost = await prisma.post.findUnique({
      where: {
        id: Number(postId) || 0
      },
      include: {
        comments: true
      }
    })
    return res.status(200).json(foundPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerPostShow
