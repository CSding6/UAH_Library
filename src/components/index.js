
/* Interface post components */
import { PostMultiplePlays, PostMultipleUsers,
        PostUser, PostPlay } from "./posts";

export { PostMultiplePlays, PostMultipleUsers,
        PostUser, PostPlay };

/* Interface with detail routes */
import { UserDetails, PlayDetails } from "./details";
export { UserDetails, PlayDetails};

/* Interface with admin specific components */
import { AdminLogin, AdminPlays, AdminUsers,
        AdminNavigation } from "./admin";
export { AdminLogin, AdminPlays, AdminUsers, AdminNavigation };

/* Interface with user specific components */
import { UserLogin, UserPlays, UserNavigation } from "./user";
export { UserLogin, UserPlays, UserNavigation };

/* Interface with entrance components */
import Intro from "./Intro.js";
import Register from "./Register.js";
export { Intro, Register };