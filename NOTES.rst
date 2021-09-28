Implementation
======

Please describe your plan for how to implement secure authentication for whoami.
How are you going to receive and store sensitive user information? How are you
going to maintain their authenticated session? Etc.

    For whoami I decided to use an npm package called bcrypt. Bcrypt uses password hashing with salt to encrypt each users password as its created and stored in the database.
    Salt is a random value that is added to the hashed password as its being sent into the database.
    To help ensure that brute forcing doesnt happen the bcrypt runs the password through salt rounds which is a cost factor.
    The cost factor controls how much time is needed to calculate a bcrypt hash. The higher the salt round value the more hashing rounds are executed.
    I have done a little research and landed on a salt round of 12 being the standard.

    As mentioned above the hashed passwords enter the database with salt values. 
    The mongo users collection also stores the username and the _id which is automatically given to each entry into the database.
    this is an example from the database of what a user entry looks like 

    { 
      "_id" : ObjectId("61512160b5e970b18fc95d45"),
      "username" : "coffee",
      "password" : "$2b$12$Rj/ax6jUqqIBr0BrGyML1OsEdAT1x3wUgyigH4i1ofB26G3SCuLYS",
      "__v" : 0 
    }

    To keep the user session maintained I used an express middleware called express-session. this middleware provides access to cookies.
    For whoami I decided to store the session ID of the user. This also prevents other users from accessing /me unless they are logged in.

    when a user logs out the session is set to null. I could have also used req.session.destroy() which destroys the session and will unset the req.session property.

Limitations, Future Work
========================

Here, describe what shortcomings or flaws exist in the version you are submitting.
Nothing is ever perfect and we expect some things to be left unfinished - it's
important to be able to recognize those issues so we can come back and fix them
later.

One area that should be improved is the accepted passwords. Currently in whoami there are no restrictions on what password can be used just as long as there is a password.
So for security purposes there need to be password restrictions in place.

Another area that I really had trouble with is in testing my own code. I haven't really written tests for my own code before.
I did a little research and before I turn whoami in I might try my hand at writing tests.

I could have used different cookie methods from express-session. I used what would be easiest for me to complete whoami. I could have used something that might be more secure for a bigger project.