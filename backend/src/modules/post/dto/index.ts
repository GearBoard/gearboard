export { GetPostByIdParamsSchema, GetPostByIdOutputDTO } from "./get-post-by-id.dto.js";
export {
  GetAllPostsQuerySchema,
  GetAllPostsOutputDTO,
  type GetAllPostsQuery,
} from "./get-all-posts.dto.js";
export {
  CreatePostBodySchema,
  CreatePostOutputDTO,
  type CreatePostBody,
} from "./create-post.dto.js";
export {
  UpdatePostParamsSchema,
  UpdatePostBodySchema,
  UpdatePostOutputDTO,
  type UpdatePostBody,
} from "./update-post.dto.js";
export { DeletePostParamsSchema } from "./delete-post.dto.js";
export {
  GetCommentsByPostIdParamsSchema,
  GetCommentsByPostIdOutputDTO,
} from "./get-comments-by-post-id.dto.js";
export {
  CreateCommentParamsSchema,
  CreateCommentBodySchema,
  CreateCommentByPostIdOutputDTO,
  type CreateCommentBody,
} from "./create-comment-by-post-id.dto.js";
