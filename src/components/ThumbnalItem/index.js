import './index.css'

const ThumbnailItem = props => {
  const {imageDetails, clickThumbnail} = props
  const {imageUrl, thumbnailUrl} = imageDetails

  const onClickThumbnail = () => {
    clickThumbnail(imageUrl)
  }

  return (
    <li>
      <button type="button" onClick={onClickThumbnail}>
        <img
          src={thumbnailUrl}
          alt="thumbnail"
        />
      </button>
    </li>
  )
}

export default ThumbnailItem