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

    For me I was very excited to learn of the assignment. 
    I have been relearning javascript and node for the last few months
    so when I learned that I would could use that I wanted to do the best I could.

    I had experience with express routing and mongo, but I had not had the chance to use those together to create authentication.
    On a previous personal project of mine I used google firestore and firebase to create authentication. So I was very excited to learn auth from scratch 
    
    There were a few packages that I had to learn to create this app. bcrypt and express-session were brand new to me. I did follow a tutorial for these sections of my code.
    The process that I like to follow with tutorials is to watch or read the whole thing first and then try to write the code. If I have trouble with a certain area I will bring up the tutorial and code along with it.
    So the biggest learning curve was combining those two with express and mongo to create a user in mongo, store the password securely and then retrive them upon login.
    It also took me a day or so to implement the username rendering on the /me page after login. I was close a few times. I could render the user_id, but not the username.
    I eventually figured it out by kind of reverse engineering my own code, so I was really excited when I finally got it working.

    I know that the instructions said not to work more than 5 hours on this project, but for me there were two reasons why I wanted to work extra hard and go beyond a little bit.
    For one it was only the second or third time during an interview process for a software engineering role that I actually felt confident that I could produce a good result. 
    So I tried as best I could.
    Second is that I really really want to work for Feathr, so if I didnt do the best that I could to my ability I would have felt bad and felt like I missed a great opportunity.


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