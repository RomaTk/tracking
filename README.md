# Tracking

The idia of this library is to use `Proxy` js object to follow changes in object which user want.

We can divide several types objects:
 1. If it changed it won't say that is was changed (type A)
 2. if it changed it will say that it was changed (type B)
 3. if its property was changed it will say that it was changed (type C)
 4. if it is object created by this library (type D)
 
> "Say" means to run some specific function `func(wasValue, nowValue, listOfBjectsChanged)`. List of object names changed if the property of object was changed.

 
 We should have several methods how to choose object which will be tracked
 
 1. `Tracked(object, functionWhatToDoIfChanged)` - this means that this object will be (type B) if it is (type A) throw ERROR by our own object for error with **error number 0**
 2. `TrackedWithChildren(object, functionWhatToDoIfChanged)` - this means that this object will be (type C) or (type B) if it is (type A) throw ERROR by our own object for error with **error number 0**
 
 For each object we will have some specific object wich will save data for change function etc...

## Project specifiaction

**Branches**
 - `master` - there will be project without `index.html`, only js files
 - `development` -  there will be project with `index.html` which will be used to run project
 - `readme` - branch to change readme
 - `vlad-...` - branches by Vlad
 - `roma-...` - branches by Roma

> Each branch before before merge into master, development, readme or into any brach in which somebody else worked before should go threw pull request where Roma and Vlad should check it.
> 
> Before creating pull request changes from the parent branch should be uploaded to decrease risk of conflicts

**Repository**

 - index.html - do not exist in `master` branch
 - README.md - do not exist in `development` branch
 - index.js  - there are two methods `Tracked()`, `TrackedWithChildren()`
 - scripts
	 - error-listener
	 - file-definition
	 - main-algorithms

> This is not full description but the main ( should be updated during
> development process)
