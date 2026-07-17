export type CommentUser = {
  name: string;
  username: string;
  avatar?: string;
};

export type CommentComposerProps = {
  user: CommentUser;
  onSubmit: (data: {
    content: string;
    image?: File;
  }) => Promise<void> | void;
  placeholder?: string;
};

export type CommentAvatarProps = {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export type CommentUserInfoProps = {
  name: string;
  username: string;
};

export type CommentInputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
};

export type CommentActionsProps = {
  onUpload?: (file: File) => void;
  onSubmit?: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
};

export type CommentImageUploadProps = {
  onUpload?: (file: File) => void;
};