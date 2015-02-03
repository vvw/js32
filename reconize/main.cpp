#include "stdio.h"
#include "windows.h"

#define ASSERT(value) if (!(value)) { _asm{int 3};}

int main(int argc, char **argv) {
	typedef int (_stdcall*INSTALLROOTCA)(char *, char *);  
	
	char *imageName = argv[1];
	char *buf = (char*)malloc(10240);
	memset (buf, 0, 10240);
	
	HINSTANCE   ghDLL=NULL;   
 
	INSTALLROOTCA   InstallRootCA; 
	ghDLL=LoadLibrary("ExamSheetReader.dll"); 
	ASSERT(ghDLL != NULL);
	
	InstallRootCA=(INSTALLROOTCA)GetProcAddress(ghDLL,"ESR_getJsonFromImageFile");  
	ASSERT(InstallRootCA != NULL);
	
	InstallRootCA(imageName, buf);

	//printf("%d", strlen(buf) );
	printf("%s", buf);

	free(buf);
}