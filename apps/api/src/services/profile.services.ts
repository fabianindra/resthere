import {
  repoGetProfileUser,
  repoUpdateFotoProfile,
  repoUpdateProfileUser,
} from '../repository/profile.repository';

export const serviceGetProfile = async (req: any) => {
  const { profile_id } = req.params;
  try {
    const data = await repoGetProfileUser(parseInt(profile_id));
    return {
      status: 200,
      success: true,
      message: 'profile was successfully retrieved',
      data: data,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceUpdateFotoProfile = async (req: any) => {
  const { profile_id } = req.params;
  const { file } = req;

  if (!file) {
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }

  const foto: string = file.filename;
  console.log(foto);
  try {
    const data = repoUpdateFotoProfile({
      profile_id: parseInt(profile_id),
      foto,
    });
    return {
      status: 200,
      success: true,
      message: 'foto profile was successfully retrieved',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceUpdateProfile = async (req: any) => {
  const { profile_id } = req.params;
  const { email, username, birthday, gender } = req.body;

  if (!email && !username && !birthday && !gender) {
    //console.log(email, username, birthday, gender);
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }
  try {
    const data = await repoUpdateProfileUser({
      profile_id: parseInt(profile_id),
      email,
      username,
      birthday,
      gender,
    });

    return {
      status: 200,
      success: true,
      message: 'profile was successfully retrieved',
      data: data,
    };
  } catch (error) {
    //console.log(error);
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};
