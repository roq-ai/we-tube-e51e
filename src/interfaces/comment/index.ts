import { VideoInterface } from 'interfaces/video';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CommentInterface {
  id?: string;
  text: string;
  video_id: string;
  viewer_id: string;
  created_at?: any;
  updated_at?: any;

  video?: VideoInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CommentGetQueryInterface extends GetQueryInterface {
  id?: string;
  text?: string;
  video_id?: string;
  viewer_id?: string;
}
