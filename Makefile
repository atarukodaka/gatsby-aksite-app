DEPLOY_DIR=../atarukodaka.github.io

develop:
	npm run develop

push:
	git co master
	git merge develop -m "merge from develop"
	git push origin master
	git co develop

deploy:
	npm run build
	(cd ${DEPLOY_DIR}; make deploy)
