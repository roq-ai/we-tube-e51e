import * as yup from 'yup';

export const commentValidationSchema = yup.object().shape({
  text: yup.string().required(),
  video_id: yup.string().nullable().required(),
  viewer_id: yup.string().nullable().required(),
});
