import _ from 'lodash'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersFindUser = async (req, res) => {
  try {
    const { params: { userId }, session: { userId: currentUserId } } = req
    console.log(userId)
    const foundUser = await prisma.user.findFirst({
      where: {
        id: Number(userId) || 0
      },
      include: {
        projects: {
          include: {
            branches: true
          }
        },
        comments: true
      },
      rejectOnNotFound: true
    })
    return res.status(200).json({
      ..._.omit(foundUser, ['passwordHash']),
      isOwner: Number(userId) === currentUserId
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersFindUser
