// import mongoose from 'mongoose';

// const trainerSchema = new mongoose.Schema(
//   {
//     accountType: {
//       type: String,
//       enum: ['User', 'Trainer'],
//       default: 'Trainer', 
//       required: [true, 'Account type is required'],
//     },
//     name: { 
//       type: String, 
//     },
//     gender: {
//       type: String,
//       enum: ['Male', 'Female', 'Other', "Don't want to inform"],
//     },
//     experience: { 
//       type: Number 
//     },
//     specialties: {
//       type: String,
//     },
//     city: { 
//       type: String, 
//     },
//     availableHours: {
//       type: String,
//     },
//     age: {
//       type: Number,
//       min: [18, '{VALUE} not allowed, minimum age: 18'],
//       max: [100, '{VALUE} not allowed, maximum age: 100'],
//       required: [true, 'Please tell your age'],
//     },
//     hourlyRate: {
//       type: Number,
//     },
//     contactInfo: {
//       email: {
//         type: String,
//       },
//       phone: {
//         type: String,
//       },
//     },
//     profilePicture: { 
//       type: String, 
//       default: '/default-profile.jpg' 
//     },
//     biography: {
//       type: String,
//     },
//     socialMediaLinks: { 
//       type: Map, 
//       of: String 
//     },
//     reviews: [
//       {
//         client: { 
//           type: mongoose.Schema.Types.ObjectId, 
//           ref: 'User' 
//         },
//         rating: { 
//           type: Number, 
//           min: 1, 
//           max: 5 
//         },
//         comment: { 
//           type: String 
//         },
//       },
//     ],
//   },
//   { 
//     versionKey: false,
//     collection: 'users' 
//   }
// );

// const Trainer = mongoose.model('users', trainerSchema);

// export { Trainer, trainerSchema };
