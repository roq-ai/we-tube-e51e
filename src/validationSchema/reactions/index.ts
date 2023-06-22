import * as yup from 'yup';

export const reactionValidationSchema = yup.object().shape({
  type: yup.string().required(),
  video_id: yup.string().nullable().required(),
  viewer_id: yup.string().nullable().required(),
});
