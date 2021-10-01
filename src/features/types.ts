import { title } from "process"

// authSlice.ts
export interface LOGIN_USER{
    id: number;
    username: string;
}

export interface FILE extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

export interface PROFILE {
    id: number;
    user_profile: number;
    img: string | null;
}

export interface POST_PROFILE {
    id: number;
    img: File | null;
}

export interface CRED {
    username: string;
    password: string;
  }

export interface JWT {
    refresh: string;
    access: string;
  }
export interface USER {
    id: number;
    username: string;
  }
export interface AUTH_STATE {
    isLoginView: boolean;
    loginUser: LOGIN_USER;
    profiles: PROFILE[];
  }

  /*thesisSlice.ts*/
export interface READ_THESIS {
    id: number;
    title: string
    authors: string
    year: number
    evaluation: string
    evaluation_score: string
    url: string
    introducer: number
    introducer_username: string
    citaiton: string
    summary: string
    comment: string
    category: number
    category_item: string
    created_at: string
    updated_at: string
  }

export interface POST_THESIS {
    id: number;
    title: string
    authors: string
    year: number
    evaluation: string
    url: string
    citaiton: string
    summary: string
    comment: string
    category: number
  }
export interface CATEGORY {
    id: number;
    item: string;
  }
export interface THESIS_STATE {
    theses: READ_THESIS[];
    editedThesis: POST_THESIS;
    selectedThesis: READ_THESIS;
    users: USER[];
    category: CATEGORY[];
  }
/*TaskList.tsx*/
export interface SORT_STATE {
    rows: READ_THESIS[];
    order: "desc" | "asc";
    activeKey: string;
  }
