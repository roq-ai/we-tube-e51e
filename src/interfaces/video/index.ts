import { CommentInterface } from 'interfaces/comment';
import { ReactionInterface } from 'interfaces/reaction';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  title: string;
  description?: string;
  tags?: string;
  url: string;
  organization_id: string;
  content_creator_id: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  reaction?: ReactionInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    comment?: number;
    reaction?: number;
  };
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  tags?: string;
  url?: string;
  organization_id?: string;
  content_creator_id?: string;
}
