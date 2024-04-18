import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getusers = createAsyncThunk("getusers", async () => {

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const initialState = {
  users: [],
  isLoading: true,
  handleDeleteclick: () => { },
  handleEdit: () => { },
  handleEditchange: () => { },
  specifiuserPost: [],
  editedPost: []
};
const usersSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    handleDeleteclick: (state, action) => {
      const updatedPosts = state.specifiuserPost.filter((post) => post.id !== action.payload);

      state.specifiuserPost = action.payload
    },

    handleEdit: (state, action) => {
      state.editedPost = action.payload;

    },
    handleEditchange: (state, action) => {
      const { name, value } = action.payload
      state.editedPost = action.payload;
      state.editedPost[name] = value;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getusers.pending, (state, action) => {
      state.isLoaisLoading = true
    });
    builder.addCase(getusers.fulfilled, (state, action) => {

      state.users = action.payload;
      state.isLoading = false
    });

    builder.addCase(getusers.rejected, (state, action) => {
      state.isLoading = true
    });
  },
}

);
export const { handleDeleteclick, handleEditchange, handleEdit } = usersSlice.actions;



export default usersSlice.reducer;


