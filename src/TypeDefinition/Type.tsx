  export type TypePost = {
    id: number,
    title: string,
    image: {
      url: string
    },
    thumbnail: {
      url: string
    },
    heart_count: number,
    hearts: { id: number, user_id: bigint}[] | null,
    bookmarks: { id: number, user_id: bigint }[] | null,
    file_type: string,
    user: { 
      name: string,
      avatar: {
        url: string
      },
      id: number
    },
  }

  export type TypePostMaterials = {
    material_1: string | null;
    material_2: string | null;
    material_3: string | null;
    material_4: string | null;
    material_5: string | null;
    material_6: string | null;
    material_7: string | null;
    material_8: string | null;
    material_9: string | null;
    material_10: string | null;
    material_11: string | null;
    material_12: string | null;
    material_13: string | null;
    material_14: string | null;
    material_15: string | null;
   }
   export type TypePostAmounts = {
    amount_1: string | null;
    amount_2: string | null;
    amount_3: string | null;
    amount_4: string | null;
    amount_5: string | null;
    amount_6: string | null;
    amount_7: string | null;
    amount_8: string | null;
    amount_9: string | null;
    amount_10: string | null;
    amount_11: string | null;
    amount_12: string | null;
    amount_13: string | null;
    amount_14: string | null;
    amount_15: string | null;
   }
   export type TypePostShow = {
    amounts: TypePostAmounts;
    bookmarked: boolean;
    coment: string;
    content: string;
    cost: string;
    file_type: string;
    hearted: boolean;
    hearts_count: number;
    id: number;
    image: {
      url: string
    }
    materials: TypePostMaterials;
    number_of_people: string;
    process: string;
    relationship: boolean;
    time: string;
    title: string;
    user: {
      id: number
      name: string
      avatar: {
        url: string
      }
    }
  }; 
  export type TypeUser = {
    name: string,
    id: number,
    avatar: {
      url: string
    }
  }
  export type TypeUserProfile = {
    name: string,
    id: number,
    introduction: string,
    avatar: {
      url: string
    }
  }
  export type TypeUserProfileEdit = {
    name: string,
    id: number,
    introduction: string,
    email: string,
    avatar: {
      url: string
    }
  }
  export type TypeMainContext = {
    handleLogin: () => void;
    loggedInStatus: string;
    user: TypeUser | undefined;
    handleLogout: () => void;                    
    promptingAccountCreation: boolean                            
    setPromptingAccountCreation: React.Dispatch<React.SetStateAction<boolean>>
    bookmarkCreate: (post: TypePost | TypePostShow) => void; 
    bookmarkDestroy: (post: TypePost | TypePostShow) => void;                       
    heartCreate: (post: TypePost | TypePostShow) => void; 
    heartDestroy: (post: TypePost | TypePostShow) => void;                           
    relationshipCreate: (id: number) => void;
    relationshipDestroy: (id: number) => void;
  }
  export type TypeFollowing = {
    id: number,
    name: string,
    avatar: {
      url: string
    },
    following: boolean
  }
  export type TypeFollowers = {
    id: number,
    name: string,
    avatar: {
      url: string
    },
    following: boolean
  }
  export type TypeDishExpand = {
    [key: number]: boolean;
  }; 
  
  export interface TypeFileDetails extends File {
    lastModifiedDate?: Date;
    webkitRelativePath: string;
  }