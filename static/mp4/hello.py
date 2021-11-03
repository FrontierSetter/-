import cv2
import os

def index_to_string(index):
  if index<10:
      return "000"+str(index)
  if index<100:
      return "00"+str(index)
  if index<1000:
      return "0"+str(index)
  return str(index)
try:
    # 创建名为data的文件夹
    if not os.path.exists('jpg'):
        os.makedirs('jpg')
except OSError:
    print('Error: Creating directory of jpg')

for i in range(1,1021):
    videoName=index_to_string(i)+".mp4"
    cam = cv2.VideoCapture(videoName)

    # frame
    currentframe = 0

    while (True):
        # reading from frame
        ret, frame = cam.read()

        if ret:
            # 如果视频仍然存在，继续创建图像
            name = './jpg/' + index_to_string(i) + '.jpg'

            # 写入提取的图像
            # cv2.imwrite(name, frame)
            cv2.imencode('.jpg', frame)[1].tofile(name)

            # 增加计数器，以便显示创建了多少帧
            currentframe += 1
        else:
            break
        if currentframe==1:
            break




# 一旦完成释放所有的空间和窗口
cam.release()

