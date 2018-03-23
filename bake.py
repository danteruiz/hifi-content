import os, json, sys, shutil, subprocess, shlex, time
EXE = os.environ['HIFI_OVEN']
LOG = 'C:/Users/dante/github/scripts/temp/testLog.txt'

def listFiles(directory, extension):
    items = os.listdir(directory)
    fileList = []
    for f in items:
        if f.endswith('.' + extension):
            fileList.append(f)
    return fileList

def camelCaseString(string):
    string = string.replace('-', ' ')
    return ''.join(x for x in string.title() if not x.isspace())

def groupFiles(originalDirectory, newDirectory, files):
    for file in files:
        newPath = os.sep.join([newDirectory, file])
        originalPath = os.sep.join([originalDirectory, file])
        shutil.move(originalPath, newPath)

def groupKTXFiles(directory, filePath):
    baseFile = os.path.basename(filePath)
    filename = os.path.splitext(baseFile)[0]
    camelCaseFileName =  camelCaseString(filename)
    path = os.sep.join([directory, camelCaseFileName])
    files = listFiles(directory, 'ktx')
    if len(files) > 0:
        createDirectory(path)
        groupFiles(directory, path, files)

        newFilePath = os.sep.join([path, baseFile+'.baked.fbx'])
        originalFilePath = os.sep.join([directory, baseFile+'.baked.fbx'])
        originalFilePath.strip()
        shutil.move(originalFilePath, newFilePath)

def bakeFile(filePath, outputDirectory):
    createDirectory(outputDirectory)
    cmd = EXE + ' -i ' + filePath + ' -o ' + outputDirectory + ' -t fbx'
    args = shlex.split(cmd)
    log = open(LOG, 'w')
    process = subprocess.Popen(cmd, stdout=log, stderr=log)
    process.wait()
    bakedFile = os.path.splitext(filePath)[0]
    groupKTXFiles(outputDirectory, bakedFile)

def bakeFilesInDirectory(directory, outputDirectory):
    for root, subFolders, filenames in os.walk(directory):
        for filename in filenames:
            if filename.endswith('.fbx'):
                filePath = os.sep.join([root, filename])
                absFilePath = os.path.abspath(filePath)
                outputFolder = os.path.join(outputDirectory, os.path.relpath(root))
                print "Baking file: " + filename
                bakeFile(absFilePath, outputFolder)
            else:
                filePath = os.sep.join([root, filename])
                absFilePath = os.path.abspath(filePath)
                outputFolder = os.path.join(outputDirectory, os.path.relpath(root))
                newFilePath = os.sep.join([outputFolder, filename])
                createDirectory(outputFolder)
                print "moving file: " + filename + " to: " + outputFolder
                shutil.copy(absFilePath, newFilePath)

def createDirectory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def checkIfExeExists:
    if not os.path.isfile(EXE) and os.access(EXE, os.X_OK):
        print 'HIFI_OVEN evironment variable is not set'
        sys.exit()

def handleOptions():
    option = sys.argv[1]
    if option == '--help' or option == '-h':
        print 'Usage: bake.py INPUT[directory to bake] OUTPUT[directory to place backed files]'
        print 'Note: If output directory will be created if directory does not exist'
        sys.exit()

def main():
    argsLength = len(sys.argv)
    if len(sys.argv) == 3:
        checkIfExeExists()
        rootDirectory = sys.argv[1]
        outputDirectory = os.path.abspath(sys.argv[2])
        createDirectory(outputDirectory)
        bakeFilesInDirectory(rootDirectory, outputDirectory)
    else if argsLength == 2:
        handleOptions()

main()
