import {Message, User} from '../../models';

export async function getMessages (req, res, next) {
  try {
    let messages = await Message.find().sort({createdAt: 'desc'}).populate('author', {
      name: true,
      surname: true,
      profileImgUrl: true
    })
    return res.status(200).json(messages);
  } catch (e) {
    return next(e)
  }
}

export async function createMessage (req, res, next) {
  try {
    let message = await Message.create({
      title: req.body.title,
      text: req.body.text,
      author: req.params.user_id
    })
    let foundUser = await User.findById(req.params.user_id);
    foundUser.messages.push(message.id);
    let foundMessage = await Message.findById(message.id).populate('author', {
      name: true,
      surname: true,
      profileImgUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch (e) {
    return next(e);
  }
}

export async function deleteMessage (req, res, next) {
  try {
    let foundMessage = await Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json()
  } catch (e) {
    return next(e);
  }
}
